package mystery

type Mystery struct {
	cfg Config
	// AwsCfg *aws_svc.Config
}

func NewMystery(cfg Config) *Mystery {
	aa := &Mystery{cfg}
	return aa
}
