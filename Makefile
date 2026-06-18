dev-web:
	npm run dev

dev-api:
	cd Backend/Api && go run ./cmd/main.go

dev:
	make -j2 dev-web dev-api
