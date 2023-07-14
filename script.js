
const loadingScreen = document.getElementById('loadingScreen');

function showLoadingScreen() {
  loadingScreen.style.display = 'flex';
}

function hideLoadingScreen() {
  loadingScreen.style.display = 'none';
}


const secretKey = '<Replace with secret Key>';



// Handle form submission
document.getElementById('refundForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const transactionId = document.getElementById('transactionId').value;
  const refundAmount = document.getElementById('refundAmount').value * 100;
  const refundReason = document.getElementById('refundReason').value;
  showLoadingScreen();
  try {
    const refund = await initiateRefund(transactionId, refundAmount, refundReason);
    document.getElementById('refundResponse').textContent = `Refund initiated: ${refund.id}`;
  } catch (error) {
    document.getElementById('refundResponse').textContent = `Error initiating refund: ${error.message}`;
  }
  hideLoadingScreen();
});


// Function to initiate a refund
async function initiateRefund(transactionId, amount, reason) {
  try {
    const response = await axios.post(
      'https://api.paystack.co/refund',
      {
        transaction: transactionId,
        amount,
        currency: 'GHS',
        customer_note: reason,
      },
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
