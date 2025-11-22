
import React, { useState } from 'react';
import { BasicInfo } from '../steps/BasicInfo';
import { AdvancedSettings } from '../steps/AdvancedSettings';
import { Review } from '../steps/Review';
import { TokenFormState, WalletState, Step, Network } from '../../types';
import { DEFAULT_FORM_STATE } from '../../constants';
import { calculateTotalFees } from '../../utils/fees';
import { uploadToStorage, uploadMetadataJson } from '../../services/storage';
import { createTokenTransaction } from '../../services/solana';
import { ChevronRight, ChevronLeft, Rocket, CheckCircle2, Loader2, Copy, ExternalLink } from 'lucide-react';
import { CONTENT } from '../../content';
import { useToast } from '../ui/Toast';

interface CreateTokenProps {
  wallet: WalletState;
  network: Network;
}

export const CreateToken: React.FC<CreateTokenProps> = ({ wallet, network }) => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.BASIC);
  const [formData, setFormData] = useState<TokenFormState>(DEFAULT_FORM_STATE);
  const { createToken } = CONTENT;
  const { showToast } = useToast();
  
  // Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState<string>("");
  const [result, setResult] = useState<{ signature: string; mint: string } | null>(null);

  const updateForm = (updates: Partial<TokenFormState>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case Step.BASIC:
        return !!formData.name && !!formData.symbol && formData.supply > 0 && !!formData.image;
      case Step.ADVANCED:
        return true; // All advanced settings are optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleCreateToken = async () => {
    if (!wallet.connected) {
      showToast("Please connect your wallet first", "error");
      return;
    }

    const totalCost = calculateTotalFees(formData);
    if (wallet.balance < totalCost) {
      showToast(`Insufficient balance. You need ${totalCost} SOL + gas fees.`, "error");
      return;
    }

    setIsProcessing(true);
    setProcessStatus("Initializing...");

    try {
      // 1. Upload Image
      setProcessStatus("Uploading image to storage...");
      const imageUrl = await uploadToStorage(formData.image);

      // 2. Upload Metadata JSON
      setProcessStatus("Uploading metadata JSON...");
      const metadataUri = await uploadMetadataJson({
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        image: imageUrl,
        external_url: formData.website,
        properties: {
          files: [{ uri: imageUrl, type: "image/png" }],
          category: "image",
          creators: formData.creatorAddress ? [{ address: formData.creatorAddress, share: 100 }] : []
        },
        extensions: {
          twitter: formData.twitter,
          telegram: formData.telegram,
          discord: formData.discord,
          tags: formData.tags // Already an array
        }
      });

      // 3. Build & Sign Transaction
      setProcessStatus("Building transaction & Waiting for wallet signature...");
      const txResult = await createTokenTransaction(formData, network, wallet.publicKey, totalCost);

      setResult({
        mint: txResult.mintAddress,
        signature: txResult.signature
      });
      
      showToast("Token created successfully!", "success");
      setCurrentStep(Step.SUCCESS);

    } catch (error) {
      console.error(error);
      showToast("Failed to create token. Please try again.", "error");
    } finally {
      setIsProcessing(false);
      setProcessStatus("");
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_FORM_STATE);
    setCurrentStep(Step.BASIC);
    setResult(null);
  };

  const getExplorerUrl = (type: 'address' | 'tx', value: string) => {
    const baseUrl = "https://explorer.solana.com";
    const suffix = network === Network.DEVNET ? "?cluster=devnet" : "";
    return `${baseUrl}/${type}/${value}${suffix}`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, "info");
  };

  // --- Render Steps ---
  const renderStepContent = () => {
    switch (currentStep) {
      case Step.BASIC:
        return <BasicInfo formData={formData} onChange={updateForm} />;
      case Step.ADVANCED:
        return <AdvancedSettings formData={formData} onChange={updateForm} />;
      case Step.REVIEW:
        return <Review formData={formData} />;
      case Step.SUCCESS:
        return (
          <div className="text-center space-y-8 py-4 animate-fadeIn">
            <div className="space-y-2">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-green-500/10">
                <CheckCircle2 className="w-10 h-10 text-solana-green" />
              </div>
              <h2 className="text-3xl font-bold dark:text-white text-gray-900 tracking-tight">{createToken.success.title}</h2>
              <p className="dark:text-gray-400 text-gray-600 text-lg">{createToken.success.subtitle} {network === Network.DEVNET ? 'Devnet' : 'Mainnet'}.</p>
            </div>
            
            <div className="grid gap-4 max-w-xl mx-auto text-left">
              
              {/* Mint Address Card */}
              <div className="p-5 dark:bg-[#0B0C10] bg-gray-50 rounded-xl border dark:border-gray-800 border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs text-gray-500 uppercase font-bold tracking-wider">{createToken.success.mintLabel}</label>
                  <a 
                    href={getExplorerUrl('address', result?.mint || '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:text-blue-400 font-medium flex items-center gap-1 hover:underline"
                  >
                    {createToken.success.explorer} <ExternalLink size={12} />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white dark:bg-[#15161b] p-3 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-sm dark:text-solana-green text-green-700 break-all shadow-inner">
                    {result?.mint}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(result?.mint || '', 'Mint Address')}
                    className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-500 dark:text-gray-400"
                    title="Copy Mint Address"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              {/* Transaction Signature Card */}
               <div className="p-5 dark:bg-[#0B0C10] bg-gray-50 rounded-xl border dark:border-gray-800 border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs text-gray-500 uppercase font-bold tracking-wider">{createToken.success.sigLabel}</label>
                  <a 
                    href={getExplorerUrl('tx', result?.signature || '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:text-blue-400 font-medium flex items-center gap-1 hover:underline"
                  >
                    {createToken.success.explorer} <ExternalLink size={12} />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white dark:bg-[#15161b] p-3 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-sm text-gray-600 dark:text-gray-400 truncate shadow-inner">
                    {result?.signature}
                  </div>
                  <button 
                     onClick={() => copyToClipboard(result?.signature || '', 'Signature')}
                    className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-500 dark:text-gray-400"
                    title="Copy Signature"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={handleReset}
              className="mt-4 px-8 py-3.5 dark:bg-gray-800 bg-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white text-gray-900 rounded-full font-bold transition-all hover:scale-105 shadow-sm"
            >
              {createToken.buttons.reset}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const stepsLabels = createToken.steps;
  const totalCost = calculateTotalFees(formData);

  return (
    <div className="max-w-3xl mx-auto py-12 animate-fadeIn">
       {/* Hide Title on Success to focus on result */}
       {currentStep !== Step.SUCCESS && (
         <div className="text-center mb-10">
           <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">{createToken.pageTitle}</h1>
           <p className="dark:text-gray-400 text-gray-600">{createToken.pageSubtitle}</p>
         </div>
       )}

       {/* Progress Bar (Hidden on Success) */}
        {currentStep !== Step.SUCCESS && (
          <div className="mb-12 px-4">
            <div className="flex justify-between mb-4 relative z-10">
              {stepsLabels.map((label, idx) => {
                const stepNum = idx + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;
                
                return (
                  <div key={label} className="flex flex-col items-center w-1/3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 
                      ${isActive ? 'border-solana-purple bg-solana-purple text-white shadow-[0_0_15px_rgba(153,69,255,0.5)]' : ''}
                      ${isCompleted ? 'border-solana-green bg-solana-green text-black' : ''}
                      ${!isActive && !isCompleted ? 'dark:border-gray-700 border-gray-300 dark:bg-[#050505] bg-white text-gray-500' : ''}
                    `}>
                      {isCompleted ? <CheckCircle2 size={20} /> : stepNum}
                    </div>
                    <span className={`text-xs mt-2 font-medium uppercase tracking-wider ${isActive ? 'dark:text-white text-black' : 'text-gray-500'}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Connecting Line */}
            <div className="relative -mt-14 mb-10 mx-12 md:mx-20 h-0.5 dark:bg-gray-800 bg-gray-300 rounded-full z-0">
               <div 
                className="h-full bg-gradient-to-r from-solana-green to-solana-purple transition-all duration-500 ease-out"
                style={{ width: `${((currentStep - 1) / (stepsLabels.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Card Content */}
        <div className="dark:bg-[#1F2937]/30 bg-white/70 backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden min-h-[500px] transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-solana-purple to-transparent opacity-50" />
          
          {renderStepContent()}

          {/* Navigation Buttons */}
          {currentStep !== Step.SUCCESS && (
            <div className="flex justify-between mt-10 pt-6 border-t dark:border-gray-800 border-gray-200">
              <button
                onClick={handleBack}
                disabled={currentStep === 1 || isProcessing}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors
                  ${currentStep === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'dark:text-gray-300 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <ChevronLeft size={18} />
                {createToken.buttons.back}
              </button>

              {currentStep === Step.REVIEW ? (
                <button
                  onClick={handleCreateToken}
                  disabled={!wallet.connected || isProcessing}
                  className={`flex items-center gap-2 px-8 py-2.5 rounded-full font-bold shadow-lg transition-all
                    ${!wallet.connected 
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-solana-purple to-indigo-600 hover:shadow-solana-purple/25 text-white hover:scale-105 active:scale-95'
                    }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      {processStatus || createToken.buttons.processing}
                    </>
                  ) : (
                    <>
                      <Rocket size={18} />
                      {wallet.connected ? 
                         (wallet.balance < totalCost ? createToken.buttons.insufficientFunds : createToken.buttons.create) 
                         : createToken.buttons.connect}
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!validateStep(currentStep)}
                  className="flex items-center gap-2 px-6 py-2.5 dark:bg-white bg-black dark:text-black text-white rounded-lg font-bold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createToken.buttons.next}
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          )}
        </div>
    </div>
  );
};
