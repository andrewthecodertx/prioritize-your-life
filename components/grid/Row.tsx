import { ScaledSheet, vs } from "react-native-size-matters";
import { AppThemedView } from "../app_components/AppThemedView";

interface RowProps {
  children: React.ReactNode;
}
const Row = ({ children, ...props }: RowProps) => {
  return(
    <AppThemedView style={styles.row} {...props}>{children}</AppThemedView>
  );
};

const styles = ScaledSheet.create({
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: vs(5),
    width: "100%",
  },
});

export default Row;
