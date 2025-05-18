export function sendMessage(message, phone) {
  try {
    const formattedPhone = phone.replace(/[()\s\-+]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;
    window.open(url, '_blank');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
