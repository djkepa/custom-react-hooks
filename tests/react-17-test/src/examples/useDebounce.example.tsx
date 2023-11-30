import useDebounce from "../src/hooks/useDebounce";

// Function to be debounced
const myFunction = () => {
  console.log('Function executed');
};

// Using the hook
const [debouncedFunction, cancelDebounce] = useDebounce(myFunction, 500);

// Call the debounced function
debouncedFunction();

// Cancel the debounce
cancelDebounce();