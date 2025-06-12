export const MyCustomFooter = () => {
  return (
    <footer className="bg-dark py-3 text-center border-top">
      <small className="text-white">
        Developed by <strong>Jean Smith Velasquez Luzon</strong> ©{" "}
        {new Date().getFullYear()}
      </small>
    </footer>
  );
};
