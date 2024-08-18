export interface UseStepOptions {
    initialStep?: number;
    totalSteps: number;
    loop?: boolean;
}
declare function useStep({ initialStep, totalSteps, loop }: UseStepOptions): {
    currentStep: number;
    goToStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
};
export { useStep };
//# sourceMappingURL=index.d.ts.map