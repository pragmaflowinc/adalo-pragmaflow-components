import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
  row: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 1,
  },
  iconWrapper: {
    marginRight: 32,
    width: 24,
    height: 24,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 16,
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconWrap: { justifyContent: 'center', height: 72 },
  avatar: {
    marginRight: 16,
    borderRadius: 20,
    height: 40,
    width: 40,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#ccc',
  },
  image: {
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    height: 56,
    width: 56,
    backgroundColor: '#ccc',
    //paddingTop: '10%',
  },
  imageWrapper: {
    height: '100%',
    justifyContent: 'flex-start',
  },
  main: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  firstLine: {
    lineHeight: 20,
    fontSize: 16,
  },
  secondLine: {
    lineHeight: 18,
    marginTop: 2,
    fontSize: 14,
    maxWidth: '100%',
  },
  titleContainer: {},
})