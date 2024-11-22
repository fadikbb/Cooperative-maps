import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  QrCodeyIcon,
  ScanBarcodeIcon as BarcodeScanIcon,
  XIcon,
} from "lucide-react";
import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  NotFoundException,
} from "@zxing/library";
import axios from "axios";

function Scanner({ isOpen, onClose }) {
  const [scannedCode, setScannedCode] = useState("");
  const [cameraError, setCameraError] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanError, setScanError] = useState(null);
  const navigate = useNavigate();
  const codeReaderRef = useRef(null);

  // Initialize code reader
  useEffect(() => {
    if (isOpen) {
      codeReaderRef.current = new BrowserMultiFormatReader(null, {
        hints: new Map([
          [DecodeHintType.TRY_HARDER, true],
          [
            DecodeHintType.POSSIBLE_FORMATS,
            [
              BarcodeFormat.QR_CODE,
              BarcodeFormat.EAN_13,
              BarcodeFormat.EAN_8,
              BarcodeFormat.UPC_A,
              BarcodeFormat.UPC_E,
              BarcodeFormat.CODE_39,
              BarcodeFormat.CODE_128,
              BarcodeFormat.ITF,
              BarcodeFormat.RSS_14,
              BarcodeFormat.RSS_EXPANDED,
            ],
          ],
        ]),
      });
    }
    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
        codeReaderRef.current = null;
      }
    };
  }, [isOpen]);

  // Handle scanned code
  const handleScannedCode = async (code) => {
    try {
      const response = await axios.get("/products.json");
      const product = response.data.filter((item) => item.id === code);
      if (!product) {
        setScanError("Product not found in our store.");
        console.error("Product not found in our store." + code);
        return;
      }
      setScannedCode(code);
      navigate(`/products/${code}`);
    } catch (err) {
      console.error("Invalid barcode or error processing the scan:", err);
      setScanError("Invalid barcode. Please try again.");
    }
  };

  // Start scanning
  const startScan = useCallback(async () => {
    try {
      const codeReader = codeReaderRef.current;
      if (!codeReader) throw new Error("Code reader not initialized.");
  
      // List all video input devices (cameras)
      const videoInputDevices = await codeReader.listVideoInputDevices();
  
      if (videoInputDevices.length === 0) {
        throw new Error("No video input devices found.");
      }
  
      // Find the back camera (typically the second device in the list)
      const backCamera = videoInputDevices.find((device) => device.label.toLowerCase().includes("back"));
      
      // If the back camera is not found, fallback to the first camera
      const selectedDeviceId = backCamera ? backCamera.deviceId : videoInputDevices[0].deviceId;
  
      // Start decoding from the selected device (back camera or fallback)
      codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        "video",
        (result, err) => {
          if (result) {
            handleScannedCode(result.getText());
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error("Scan error:", err);
            setScanError("An error occurred while scanning. Please try again.");
          }
        }
      );
  
      setCameraActive(true);
      setCameraError(null);
      setScanError(null);
  
    } catch (error) {
      console.error("Camera initialization error:", error);
  
      if (error.name === "NotAllowedError") {
        // Handle camera permission denial
        setCameraError("Camera permission denied. Please enable camera access.");
      } else if (error.name === "NotFoundError") {
        // Handle no camera found
        setCameraError("No camera found. Please connect a camera.");
      } else {
        setCameraError("Unable to access the camera.");
      }
  
      setCameraActive(false);
    }
  }, []);
  
  // Handle close
  const handleClose = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    setScannedCode("");
    setCameraError(null);
    setCameraActive(false);
    setScanError(null);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#4d9900]">
            Scan Product
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-[#4d9900] transition-colors duration-200"
            aria-label="Close"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {!cameraActive ? (
          <div className="text-center py-8">
            {cameraError ? (
              <p className="text-red-600 mb-4">{cameraError}</p>
            ) : (
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Camera Permission Required
              </h3>
            )}
            <button
              onClick={startScan}
              className="bg-[#4d9900] text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-[rgba(248,197,25,255)] hover:text-[#4d9900] transition-all duration-300 flex items-center justify-center mx-auto"
            >
              <BarcodeScanIcon className="w-5 h-5 mr-2" />
              Allow Camera Access
            </button>
          </div>
        ) : (
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              id="video"
              className="w-full h-72 rounded"
              autoPlay
              muted
            ></video>
            <div
              className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)",
              }}
            >
              <div className="w-4/5 h-1/2 border-2 border-white rounded-lg relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[rgba(248,197,25,255)]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[rgba(248,197,25,255)]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[rgba(248,197,25,255)]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[rgba(248,197,25,255)]"></div>
              </div>
              <p className="text-white text-center text-sm mt-4 px-4">
                Align the barcode or QR code within this frame
              </p>
            </div>

            {scannedCode && (
              <p className="mt-4 text-[#4d9900] text-center bg-white bg-opacity-75 py-2 rounded font-medium">
                <strong>Scanned Code:</strong> {scannedCode}
              </p>
            )}
          </div>
        )}
        <div className="mt-4 text-center text-sm text-gray-600">
          {scanError && (
            <p className="mt-4 text-red-600 text-center bg-white bg-opacity-75 py-2 rounded">
              {scanError}
            </p>
          )}
          <p>
            Supported formats: QR Code, EAN, UPC, ISBN, Code 39, Code 128, ITF
          </p>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
