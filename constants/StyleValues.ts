export default {
  radius: 8,
  get button() {
    return {
      borderRadius: this.radius,
      paddingHorizontal: 15
    }
  },
  get tab() {
    return {
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: this.radius,
    }
  }
}