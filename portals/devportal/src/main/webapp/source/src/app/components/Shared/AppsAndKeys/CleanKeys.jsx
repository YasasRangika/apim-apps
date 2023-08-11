/*
 * Copyright (c) 2023, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import DeleteIcon from '@material-ui/icons/Delete';

function CleanKeys(props) {
    const {
        keyMappingId, keys, selectedTab, handleClickClean,
    } = props;

    return (
        <Button
            id='remove-generated-keys'
            variant='outlined'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={() => handleClickClean(keyMappingId)}
            disabled={!keys.get(selectedTab)
                .supportedGrantTypes.includes('client_credentials')}
        >
            <FormattedMessage
                id='Shared.AppsAndKeys.ViewKeys.remove.keys'
                defaultMessage='Remove Keys'
            />
        </Button>
    );
}

export default CleanKeys;
