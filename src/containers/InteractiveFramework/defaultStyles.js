export default function getStylesFromTheme(theme) {
  return {
    button: {
      backgroundColor: theme.buttonBackground,
      color: theme.buttonText,
    },
    defaultText: {
      color: theme.contentText,
    },
    primaryText: {
      color: theme.contectHighlight,
    },
    page: {
      backgroundColor: theme.pageBackground,
      color: theme.pageText,
    },
  };
}
