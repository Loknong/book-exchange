export const isMockMode = () =>{
    return import.meta.env.VITE_APP_MODE === "mock";
}