Feature: API health check
  As a developer or operator
  I want to check that the API is running
  So that I know the platform is available

  Scenario: The API reports it is running
    When I request the health endpoint
    Then the response status is 200
    And the response body has status "ok"
