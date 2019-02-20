export default {
  data: (data: any) => ({ status: 'success', data }),
  message: (message: string) => ({ status: 'success', message }),
  error: (message: string) => ({ status: 'error', message })
}
