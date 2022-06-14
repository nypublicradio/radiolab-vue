#!/bin/bash

declare key=${ENV^^}_ALGOLIA_API_KEY
export ALGOLIA_API_KEY=$key

echo key: ${!key}
echo second: $ALGOLIA_API_KEY

# declare app_id="${ENV^^}_ALGOLIA_APP_ID"
# export ALGOLIA_APP_ID=$app_id