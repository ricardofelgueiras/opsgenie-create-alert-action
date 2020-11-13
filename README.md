# OpsGenie alert creation 

This action create an alert in OpsGenie (via API) for a specified issue. 
Note: the issue must have a label containing the priority (P1, P2, P3, P4 or P5)

## Inputs

### `api-key`

**Required** OpsGenie API Key.

### `opsgenie-api-url`

**Required** OpsGenie API URL.

## Example usage

```yaml
uses: ricardofelgueiras/opsgenie-create-alert-action@v1.0
with:
  api-key: "${{ secrets.OPSGENIE_APIKEY }}"
  opsgenie-api-url: "${{ secrets.OPSGENIE_URL }}"
```