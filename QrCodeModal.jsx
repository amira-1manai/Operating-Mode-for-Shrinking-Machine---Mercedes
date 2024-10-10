import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QrCodeModal = ({ qrCodeValue, onClose }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        // URL for QR Code API
        const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrCodeValue)}`;
        setQrCodeUrl(apiUrl);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    fetchQrCode();
  }, [qrCodeValue]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg">
        <img
          src={qrCodeUrl}
          alt="QR Code"
          className="w-64 h-64"
        />
        <button
          className="mt-4 bg-pink-700 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QrCodeModal;
