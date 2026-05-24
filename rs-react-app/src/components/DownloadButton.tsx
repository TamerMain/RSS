function DownloadButton(props: { cart: string[] }) {
  function handleDownload() {
    if (props.cart.length === 0) return;
    const content = props.cart.join('\r\n');
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${props.cart.length}_cards_selected.csv`;
    a.click();

    URL.revokeObjectURL(url);
  }
  return (
    <button
      className="p-2  bg-mist-800 hover:text-gray-50 cursor-pointer transition-colors duration-400"
      onClick={handleDownload}
    >
      Download CSV
    </button>
  );
}

export default DownloadButton;
