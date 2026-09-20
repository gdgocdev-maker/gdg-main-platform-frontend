# API Integration

## Contract-first rule

The frontend consumes the separate NestJS backend through its published Swagger/OpenAPI contract. This contract is authoritative for implemented endpoint behavior. Its location, versioning policy, generated-client choice, and release workflow are **TBD**, but the frontend must not treat their absence as permission to invent a contract.

Until then, do not invent:

- endpoint paths or HTTP methods;
- request or response fields;
- enum values, role names, or permission semantics;
- auth headers, cookie strategy, token storage, refresh flow, or error envelope;
- pagination, filtering, upload, or retry conventions.

## Integration checklist

For each API-backed UI capability, confirm:

| Item | Required confirmation |
| --- | --- |
| Endpoint | Method and path |
| Request | DTO, required fields, validation feedback |
| Response | DTO and nullable/optional fields |
| Access | Authentication and backend permission requirement |
| States | Loading, empty, domain error, network failure, unauthorized/forbidden |
| Change control | Contract version or compatible-change decision |

Do not consume a production-facing endpoint unless the published specification contains its operation and security requirement. If a needed operation does not exist, record the requested behavior in the approved Notion task and coordinate the backend contract change first.

## Local configuration

The technical guide shows the frontend running at `http://localhost:3000` and the backend API at `http://localhost:3001`, with `NEXT_PUBLIC_API_URL` pointing to the API. Treat these as initial local-development guidance. The final local ports and all non-local base URLs must be confirmed in the repositories’ environment templates.

## Security boundary

Do not put secrets in `NEXT_PUBLIC_*` variables. The browser must not be trusted to enforce roles or protect data. The frontend may use backend-provided identity/permission information to shape the interface, while the backend remains the enforcement point.
