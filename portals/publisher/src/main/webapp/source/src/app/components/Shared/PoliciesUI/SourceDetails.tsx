/*
* Copyright (c) 2023, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.
* 
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
* 
* http://www.apache.org/licenses/LICENSE-2.0
* 
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import FormControl from '@material-ui/core/FormControl';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import CONSTS from 'AppData/Constants';

const useStyles = makeStyles((theme: Theme) => ({
    mandatoryStar: {
        color: theme.palette.error.main,
        marginLeft: theme.spacing(0.1),
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'row',
    },
}));

export const GATEWAY_TYPE_LABELS = {
    SYNAPSE: 'Regular Gateway',
    CC: 'Choreo Connect'
}

interface SourceDetailsSharedProps {
    supportedGateways: string[];
    synapsePolicyDefinitionFile?: any[];
    setSynapsePolicyDefinitionFile?: React.Dispatch<React.SetStateAction<any[]>>;
    ccPolicyDefinitionFile?: any[];
    setCcPolicyDefinitionFile?: React.Dispatch<React.SetStateAction<any[]>>;
    isViewMode?: boolean;
    handlePolicyDownload?: () => void;
    supportedGatewaysError: any;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    UploadPolicyDropzone: any;
}

/**
 * Renders the general details section.
 * @param {JSON} props Input props from parent components.
 * @returns {TSX} General details of the policy.
 */
const SourceDetailsShared: FC<SourceDetailsSharedProps> = ({
    supportedGateways,
    synapsePolicyDefinitionFile,
    setSynapsePolicyDefinitionFile,
    ccPolicyDefinitionFile,
    setCcPolicyDefinitionFile,
    isViewMode,
    handlePolicyDownload,
    supportedGatewaysError,
    handleChange,
    UploadPolicyDropzone
}) => {
    const classes = useStyles();

    /**
     * Renders the policy file upload related section
     * @param {any[]} policyFile Policy file
     * @param {React.Dispatch<React.SetStateAction<any[]>>} setPolicyFile Policy file setter
     * @param {string} gateway Gateway type
     * @returns {TSX} Policy upload section
     */
    const renderPolicyFileUpload = (
        policyFile: any[],
        setPolicyFile: React.Dispatch<React.SetStateAction<any[]>>,
        gateway: string,
    ) => {
        return (
            <UploadPolicyDropzone
                policyDefinitionFile={policyFile}
                setPolicyDefinitionFile={setPolicyFile}
                gateway={gateway}
            />
        );
    };

    /**
     *
     * @returns {TSX} Policy download section
     */
    const renderPolicyDownload = () => {
        return (
            <>
                <Box display='flex' flexDirection='row' alignItems='center'>
                    <Typography
                        color='inherit'
                        variant='subtitle2'
                        component='div'
                    >
                        <FormattedMessage
                            id='Apis.Details.Policies.PolicyForm.SourceDetails.form.policy.file.title'
                            defaultMessage='Policy File(s)'
                        />
                        <sup className={classes.mandatoryStar}>*</sup>
                    </Typography>
                </Box>
                <Typography color='inherit' variant='caption' component='p'>
                    <FormattedMessage
                        id='Apis.Details.Policies.PolicyForm.SourceDetails.form.policy.file.description'
                        defaultMessage='Policy file contains the business logic of the policy'
                    />
                </Typography>
                <Box
                    flex='1'
                    display='flex'
                    flexDirection='row'
                    justifyContent='left'
                    mt={3}
                    mb={3}
                >
                    <Button
                        aria-label='download-policy'
                        variant='contained'
                        data-testid='download-policy-file'
                        size='large'
                        color='primary'
                        onClick={handlePolicyDownload}
                        endIcon={<CloudDownloadIcon />}
                    >
                        <FormattedMessage
                            id='Apis.Details.Policies.PolicyForm.SourceDetails.form.policy.file.download'
                            defaultMessage='Download Policy'
                        />
                    </Button>
                </Box>
            </>
        );
    }

    return (   
        <Box display='flex' flexDirection='row' mt={1} data-testid='gateway-details-panel'>
            <Box width='40%' pt={3} mb={2}>
                <Box width='90%'>
                    <Typography
                        color='inherit'
                        variant='subtitle2'
                        component='div'
                    >
                        <FormattedMessage
                            id='Apis.Details.Policies.PolicyForm.SourceDetails.title'
                            defaultMessage='Gateway Specific Details'
                        />
                    </Typography>
                    <Typography color='inherit' variant='caption' component='p'>
                        <FormattedMessage
                            id='Apis.Details.Policies.PolicyForm.SourceDetails.description'
                            defaultMessage={
                                'Define the Gateway (s) that will be supporting this policy. ' +
                                'Based off of this selection, you can upload the relevant business ' +
                                'logic inclusive policy file.'
                            }
                        />
                    </Typography>
                </Box>
            </Box>
            <Box width='60%'>
                <Box display='flex' flexDirection='row' alignItems='center' data-testid='supported-gateways-form'>
                    <Typography color='inherit' variant='body1' component='div'>
                        <FormattedMessage
                            id='Apis.Details.Policies.PolicyForm.SourceDetails.form.supported.gateways.label'
                            defaultMessage='Supported Gateways'
                        />
                        <sup className={classes.mandatoryStar}>*</sup>
                    </Typography>
                    <Box
                        flex='1'
                        display='flex'
                        flexDirection='row-reverse'
                        justifyContent='space-around'
                    >
                        <FormControl
                            required
                            component='fieldset'
                            variant='standard'
                            margin='normal'
                            error={supportedGatewaysError}
                        >
                            <FormGroup className={classes.formGroup}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name='regularGateway'
                                            color='primary'
                                            checked={supportedGateways.includes(
                                                CONSTS.GATEWAY_TYPE.synapse,
                                            )}
                                            onChange={handleChange}
                                        />
                                    }
                                    label={GATEWAY_TYPE_LABELS.SYNAPSE}
                                    data-testid='regular-gateway-label'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name='choreoConnect'
                                            color='primary'
                                            checked={supportedGateways.includes(
                                                CONSTS.GATEWAY_TYPE.choreoConnect,
                                            )}
                                            onChange={handleChange}
                                        />
                                    }
                                    label={GATEWAY_TYPE_LABELS.CC}
                                    data-testid='choreo-connect-label'
                                />
                            </FormGroup>
                            <FormHelperText>
                                {supportedGatewaysError
                                    ? 'Please select one or more Gateways'
                                    : ''}
                            </FormHelperText>
                        </FormControl>
                    </Box>
                </Box>

                {/* Render dropzones for policy file uploads */}
                {supportedGateways.includes(CONSTS.GATEWAY_TYPE.synapse) &&
                    !isViewMode &&
                    synapsePolicyDefinitionFile &&
                    setSynapsePolicyDefinitionFile &&
                    renderPolicyFileUpload(
                        synapsePolicyDefinitionFile,
                        setSynapsePolicyDefinitionFile,
                        GATEWAY_TYPE_LABELS.SYNAPSE,
                        
                    )}
                {supportedGateways.includes(CONSTS.GATEWAY_TYPE.choreoConnect) &&
                    !isViewMode &&
                    ccPolicyDefinitionFile &&
                    setCcPolicyDefinitionFile &&
                    renderPolicyFileUpload(
                        ccPolicyDefinitionFile,
                        setCcPolicyDefinitionFile,
                        GATEWAY_TYPE_LABELS.CC,
                    )}

                {/* Render policy file download option in view mode */}
                {isViewMode && renderPolicyDownload()}
            </Box>
        </Box>
    );
};

export default SourceDetailsShared;