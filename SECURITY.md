# Security Policy

The RNBlocks project takes the security and integrity of distributed components seriously. Because the RNBlocks CLI downloads and writes React Native source code directly into user codebases, maintainers enforce rigorous review standards for all contributed items.

---

## Supported Versions

Security updates are applied to the latest release of the CLI and current items in the registry:

| Package / Surface | Supported Version |
|---|---|
| `@rnblocks/cli` | Latest published npm release |
| `@rnblocks/registry` | Current `master` branch |
| `registry/blocks/*` | Current `master` branch |
| `registry/screens/*` | Current `master` branch |

---

## What We Consider Security Issues

We treat the following as security vulnerabilities:

1. **Malicious Block Code**:
   - Unauthorized network requests (`fetch`, `XMLHttpRequest`, WebSocket connections) transmitting user or device data.
   - Dynamic code evaluation (`eval()`, `new Function()`).
   - Process execution or native bridge abuse (`child_process`, unauthorized native modules).
   - Hardcoded API keys, tokens, credentials, or tracking identifiers.
   - Dependency confusion attacks or unauthorized remote script injection.

2. **CLI Infrastructure Vulnerabilities**:
   - Arbitrary file write or path traversal during `rnblocks add`.
   - Insecure HTTP communication when fetching registry manifests.
   - Remote code execution through unescaped command parameters or dependencies.

3. **Registry Integrity**:
   - Tampered registry manifests or corrupted file checksums.
   - Impersonation of maintainers or official blocks.

---

## Reporting a Vulnerability

If you discover a potential security vulnerability, please do NOT open a public GitHub issue.

Please report all security findings privately:

- **Email**: ashwinkhowala@gmail.com
- **Subject**: `[SECURITY] RNBlocks Vulnerability Report: <Brief Description>`

### Information to Include in Your Report:
- A description of the vulnerability and its potential impact.
- Affected component slug (for blocks/screens) or package name (for CLI/registry).
- Step-by-step reproduction instructions or proof-of-concept code.
- Any suggested mitigations or patches, if available.

### Response Timeline
- **Initial acknowledgment**: Within 48 hours of receipt.
- **Triage and assessment**: Within 5 business days.
- **Remediation**: Patches or component removals will be published to the registry and npm immediately upon confirmation.

---

## Contributed Code Review Obligations

Maintainers review every pull request contributing or modifying blocks or screens before merge:
- Static analysis for suspicious patterns (`eval`, unapproved network calls, native bridge calls).
- Dependency validation against official Expo and React Native registries.
- Manual verification of component source code.

Any pull request introducing unauthorized network telemetry, obfuscated code, or hidden dependencies will be rejected and the contributor reported.
