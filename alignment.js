document.addEventListener('DOMContentLoaded', function() {
    // Add input validation
    function validateInputs() {
        const seq1 = document.getElementById('seq1').value.trim();
        const seq2 = document.getElementById('seq2').value.trim();
        const matchScore = document.getElementById('matchScore').value;
        const mismatchScore = document.getElementById('mismatchScore').value;
        const gapScore = document.getElementById('gapScore').value;

        if (!seq1 || !seq2) {
            alert("Please enter both sequences");
            return false;
        }

        if (!matchScore || !mismatchScore || !gapScore) {
            alert("Please enter all scoring parameters");
            return false;
        }

        return true;
    }

    window.performAlignment = function() {
        if (!validateInputs()) return;

        try {
            const seq1 = document.getElementById('seq1').value.toUpperCase();
            const seq2 = document.getElementById('seq2').value.toUpperCase();
            
            const matchScore = parseInt(document.getElementById('matchScore').value) || 2;
            const mismatchScore = parseInt(document.getElementById('mismatchScore').value) || -1;
            const gapScore = parseInt(document.getElementById('gapScore').value) || -2;

            const scoreParams = new ScoreParam(matchScore, mismatchScore, gapScore);
            const { bestScore, bestLocation, scoreMatrix, pointerMatrix } = localAlign(seq1, seq2, scoreParams);
            const [aligned1, aligned2] = traceback(seq1, seq2, scoreMatrix, pointerMatrix, bestLocation);

            // Update DOM with results
            document.getElementById('scoreMatrix').textContent = formatMatrix(scoreMatrix, seq1, seq2);
            document.getElementById('tracebackMatrix').textContent = 
                formatTracebackMatrix(pointerMatrix, seq1, seq2, scoreMatrix, bestLocation);
            document.getElementById('alignment').innerHTML = 
                `Sequence 1: ${aligned1}<br>Sequence 2: ${aligned2}`;
            document.getElementById('alignmentScore').textContent = `Score: ${bestScore}`;
        } catch (error) {
            alert("An error occurred during alignment. Please check your inputs.");
            console.error(error);
        }
    };

    // Initialize default values
    document.getElementById('matchScore').value = 2;
    document.getElementById('mismatchScore').value = -1;
    document.getElementById('gapScore').value = -2;
});
