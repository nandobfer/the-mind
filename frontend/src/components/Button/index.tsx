import { CSSProperties } from "react";
import { ButtonContainer } from "./styles";

interface IButtonProps {
	onClick?(): void,
	title?: string;
	iconButton?: boolean;
	icon?: string;
	variant?: "accent" | "pink",
	type?: "button" | "submit" | "reset" | undefined;
	styles?: CSSProperties;
	align?: "center" | "left" | "right" | undefined;
	disabled?: boolean;
	active?: boolean;
}

const Button = ({
	onClick,
	title,
	iconButton = false,
	icon = undefined,
	variant = "accent",
	type = "button",
	styles = {},
	align,
	active,
	...rest
}: IButtonProps) => {
	return (
		<ButtonContainer
			type={type}
			onClick={onClick}
			className={`${variant} ${align || ""} ${iconButton ? 'icon' : ''} ${active ? 'active' : ''}`}
			style={styles}
			{...rest}
		>
			{(iconButton && icon) && <img src={icon} alt={title} />}
			{title}
		</ButtonContainer>
	)
}

export default Button;