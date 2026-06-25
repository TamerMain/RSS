type PasswordStrBarProps = {
  password: string;
};

const strengthCalc = (password: string): number => {
  let strength = 1;
  if (/[0-9]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const getStrengthClass = (strength: number): string => {
  if (strength === 0 || strength === 1) {
    return 'bg-transparent w-0';
  }
  if (strength <= 2) {
    return 'bg-red-400 w-12';
  }
  if (strength <= 3) {
    return 'bg-orange-300 w-24';
  }
  if (strength <= 4) {
    return 'bg-yellow-300 w-36';
  }
  return 'bg-green-300 w-48';
};

function PasswordStrBar(props: PasswordStrBarProps) {
  const strength = props.password ? strengthCalc(props.password) : 0;
  const barColor = getStrengthClass(strength);

  return (
    <div
      data-testid="password_str"
      className={`relative -right-48 top-1 h-1 ${barColor} transition-all`}
    />
  );
}

export default PasswordStrBar;
