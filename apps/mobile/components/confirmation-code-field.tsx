import { View } from "react-native";
import {
	CodeField,
	Cursor,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Text, useTheme } from "react-native-paper";

type ConfirmationCodeFieldProps = {
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
};

export default function ConfirmationCodeField({
	code,
	setCode,
}: ConfirmationCodeFieldProps) {
	const [codeFieldProps, getCellOnLayout] = useClearByFocusCell({
		value: code,
		setValue: setCode,
	});

	const theme = useTheme();

	return (
		<CodeField
			{...codeFieldProps}
			value={code}
			onChangeText={setCode}
			cellCount={6}
			rootStyle={{ marginTop: 20, marginBottom: 20 }}
			keyboardType="number-pad"
			textContentType="oneTimeCode"
			renderCell={({ index, symbol, isFocused }) => (
				<View key={index}>
					<Text
						onLayout={getCellOnLayout(index)}
						style={[
							{
								width: 40,
								height: 50,
								lineHeight: 50,
								fontSize: 24,
								borderWidth: 1,
								borderColor: theme.colors.primary,
								textAlign: "center",
								color: isFocused
									? theme.colors.secondary
									: theme.colors.primary, // text color
							},
							isFocused && {
								borderColor: theme.colors.secondary,
							},
						]}
					>
						{symbol || (isFocused && <Cursor />)}
					</Text>
				</View>
			)}
		/>
	);
}
