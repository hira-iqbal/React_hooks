import React from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
});

// export const AuthContextProvider = (props) => {
//   console.log(props);

//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const storedUserLoginInfo = localStorage.getItem('isLoggedIn');

//     if(storedUserLoginInfo === '1'){
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const loginHandler = () => {
//     localStorage.setItem('isLoggedIn', '1');
//     setIsLoggedIn(true);
//   };

//   const logoutHandler = () => {
//     localStorage.removeItem('isLoggedIn');
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{
//         isLoggedIn: isLoggedIn,
//         onLogout: logoutHandler,
//         onLogin: loginHandler,
//       }}
//     >
//       {props.chlidren}
//     </AuthContext.Provider>

//   );
// };

export default AuthContext;
