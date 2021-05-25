import '../auth-form.css';

function ErrorMessage({ children }: any) {
  return (
    <div className="error-msg__container">
      <div className="error-msg">{children}</div>
    </div>
  );
}

export default ErrorMessage;
