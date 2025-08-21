'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

interface AgeGateModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const AgeGateModal = ({ isOpen, onConfirm, onClose }: AgeGateModalProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    // Check if user has already confirmed age
    const ageOk = localStorage.getItem('age_ok');
    if (ageOk === 'true') {
      setIsConfirmed(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('age_ok', 'true');
    setIsConfirmed(true);
    onConfirm();
  };

  const handleClose = () => {
    onClose();
  };

  if (isConfirmed) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Age Verification Required">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Age Verification Required
        </h3>
        
        <p className="text-sm text-gray-500 mb-6">
          This product contains items that require you to be 18 years or older to purchase. 
          By clicking "I am 18 or older", you confirm that you meet the age requirement.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleConfirm}
            className="flex-1"
          >
            I am 18 or older
          </Button>
          
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            I am under 18
          </Button>
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          You must be 18 or older to purchase airsoft guns, gel blasters, and related products.
        </p>
      </div>
    </Modal>
  );
};

export default AgeGateModal;
