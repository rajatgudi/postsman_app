import { EnumAuthTypes } from "@/enums";
import SignUpForm from "./signup-auth-form";
import LoginForm from "./login-auth-form";
type UserAuthFormProps = {
  type: EnumAuthTypes;
};
const UserAuthForm = ({ type }: UserAuthFormProps) => {
  return <>{type === EnumAuthTypes.login ? <LoginForm /> : <SignUpForm />}</>;
};

export default UserAuthForm;
