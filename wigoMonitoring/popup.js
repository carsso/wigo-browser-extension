chrome.storage.sync.get('wigoUrl', function (options) {
    if (options.wigoUrl) {
        document.getElementById('wigoFrame').src = options.wigoUrl;
    } else {
        const alert = document.getElementById('wigoAlert');
        alert.innerHTML = '<h4>Missing configuration</h4><p>Specify your Wigo URL in options.</p><p><a href="options.html" class="btn btn-danger">Open options</a></p>';
        alert.style.display = 'block';
    }
});
