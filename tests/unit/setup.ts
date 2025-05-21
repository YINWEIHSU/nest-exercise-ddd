jest.mock('@libs/application/context/AppRequestContext', () => ({
  RequestContextService: {
    getRequestId: () => 'test-request-id',
  },
}))
