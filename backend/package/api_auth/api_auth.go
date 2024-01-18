package api_auth

type ApiAuth struct {
	cfg Config
}

func NewApiAuth(cfg Config) *ApiAuth {
	aa := &ApiAuth{cfg}

	return aa
}
