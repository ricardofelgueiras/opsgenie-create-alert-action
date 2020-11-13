const opsGenieOperations = require('./opsGenie');

test('multiple priority labels return the highest priority', () => {
    var labelsJson = [
        {
          "name": "P1",
        },
        {
          "name": "P2",
        }
      ];
    
    var priority = opsGenieOperations.getPriorityFromLabels(labelsJson);
    expect(priority).toBe("P1");
});


test('multiple labels without priority labels returns P5 as default', () => {
    var labelsJson = [
        {
          "name": "name 1",
        },
        {
          "name": "name 2",
        }
      ];
    
    var priority = opsGenieOperations.getPriorityFromLabels(labelsJson);
    expect(priority).toBe("P5");
});

test('issue with multiple priorities return ops genie alert with highest priority', () => {
  var issueJson = {
    "labels": [
      {
        "name": "P1",
      },
      {
        "name": "P2",
      }
    ],
    "title": "P1: My God!!! The world is ending! Stop the counting!!",
    "html_url": "https://nourl"
  };

  var opsGenieAlert = opsGenieOperations.getJson(issueJson);
  expect(opsGenieAlert.message).toBe("P1: My God!!! The world is ending! Stop the counting!!");
  expect(opsGenieAlert.priority).toBe("P1");
});