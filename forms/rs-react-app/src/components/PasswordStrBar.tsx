type PasswordStrBarProps = {
  password: string;
};

const strengthCalc = (password: string) => {
  let strength = 1;
  if (/[0-9]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

function PasswordStrBar(props: PasswordStrBarProps) {
  const strength = props.password ? strengthCalc(props.password) : 0;

  const barColor =
    strength === 0 || strength === 1
      ? 'bg-transparent w-0'
      : strength <= 2
        ? 'bg-red-400 w-12'
        : strength <= 3
          ? 'bg-orange-300 w-24'
          : strength <= 4
            ? 'bg-yellow-300 w-36'
            : 'bg-green-300 w-48';
  return (
    <div data-testid="password_str"
      className={`relative -right-48 top-1 h-1 ${barColor} transition-all`}
    ></div>
  );
}

export default PasswordStrBar;
