VERSION := $(shell grep -Po '(?<="version": ")[^"]*' wigoMonitoring/manifest.json)

.PHONY: all clean firefox chrome

all: firefox chrome

clean:
	rm -f release/wigo-monitoring-*.zip
	rm -rf release/firefox*
	rm -rf release/chrome*

firefox: clean
	mkdir -p release
	mkdir -p release/firefox-$(VERSION)
	cp -r wigoMonitoring/* release/firefox-$(VERSION)/
	cd release/firefox-$(VERSION) && zip -r ../wigo-monitoring-firefox-$(VERSION).zip * -x "*.git*" "manifest.json"
	cat release/firefox-$(VERSION)/manifest.json | jq 'del(.background.service_worker) | del(.permissions[] | select(. == "offscreen"))' > release/firefox-$(VERSION)/manifest.json.tmp && mv release/firefox-$(VERSION)/manifest.json.tmp release/firefox-$(VERSION)/manifest.json
	cd release/firefox-$(VERSION) && zip -r ../wigo-monitoring-firefox-$(VERSION).zip manifest.json

chrome: clean
	mkdir -p release
	mkdir -p release/chrome-$(VERSION)
	cp -r wigoMonitoring/* release/chrome-$(VERSION)/
	cd release/chrome-$(VERSION) && zip -r ../wigo-monitoring-chrome-$(VERSION).zip * -x "*.git*" "manifest.json"
	cat release/chrome-$(VERSION)/manifest.json | jq 'del(.browser_specific_settings) | del(.background.scripts)' > release/chrome-$(VERSION)/manifest.json.tmp && mv release/chrome-$(VERSION)/manifest.json.tmp release/chrome-$(VERSION)/manifest.json
	cd release/chrome-$(VERSION) && zip -r ../wigo-monitoring-chrome-$(VERSION).zip manifest.json

push-tag:
	git tag -a v$(VERSION) -m "Release v$(VERSION)"
	git push origin v$(VERSION)
