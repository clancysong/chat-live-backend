export default {
  success: (data: any) => ({ status: 'success', data }),
  error: (message: string) => ({ status: 'error', message })
}
