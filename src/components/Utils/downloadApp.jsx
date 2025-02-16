import React from 'react';

function DownloadButton() {
  const handleDownload = () => {
    const content = 'This is the content of the file you want to download.';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'download.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload}>Download</button>
  );
}

export default DownloadButton;
