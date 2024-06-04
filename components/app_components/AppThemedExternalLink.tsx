import { Link } from "expo-router";
import { Platform } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { type ComponentProps } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  lightColor?: string;
  darkColor?: string;
};

export function AppThemedExternalLink({
  href,
  style,
  lightColor,
  darkColor,
  ...rest
}: Props) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        }
      }}
      style={[{ color }, style]}
    />
  );
}
