document.addEventListener('DOMContentLoaded', () => {
    const solAmountInput = document.getElementById('solAmount');
    const copyAddressBtn = document.getElementById('copyAddress');
    const walletAddressInput = document.getElementById('walletAddress');
    const tokenAmountDisplay = document.getElementById('tokenAmount');

    const SGT_PER_SOL = 42000; // 1 SOLANA = 42,000 SGT

    // Custom alert function to match website style
    function customAlert(message) {
        // Create alert container
        const alertContainer = document.createElement('div');
        alertContainer.style.position = 'fixed';
        alertContainer.style.top = '20px';
        alertContainer.style.left = '50%';
        alertContainer.style.transform = 'translateX(-50%)';
        alertContainer.style.backgroundColor = 'var(--cartoon-yellow)';
        alertContainer.style.color = 'var(--cartoon-blue)';
        alertContainer.style.padding = '15px 30px';
        alertContainer.style.borderRadius = '15px';
        alertContainer.style.border = '3px solid var(--cartoon-blue)';
        alertContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        alertContainer.style.zIndex = '1000';
        alertContainer.style.fontFamily = "'Inter', sans-serif";
        alertContainer.style.fontWeight = 'bold';
        alertContainer.style.textAlign = 'center';
        alertContainer.style.maxWidth = '300px';
        
        alertContainer.textContent = message;

        // Add to body
        document.body.appendChild(alertContainer);

        // Remove after 2 seconds
        setTimeout(() => {
            document.body.removeChild(alertContainer);
        }, 2000);
    }

    // Automatically calculate tokens on input
    solAmountInput.addEventListener('input', () => {
        const solAmount = parseFloat(solAmountInput.value);
        
        if (isNaN(solAmount) || solAmount <= 0) {
            tokenAmountDisplay.textContent = '0';
            return;
        }

        const tokenAmount = solAmount * SGT_PER_SOL;
        tokenAmountDisplay.textContent = tokenAmount.toLocaleString();
    });

    copyAddressBtn.addEventListener('click', () => {
        walletAddressInput.select();
        document.execCommand('copy');
        customAlert('Wallet address copied');
    });
});
