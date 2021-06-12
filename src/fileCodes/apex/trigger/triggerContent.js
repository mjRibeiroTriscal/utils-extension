const Trigger = {
    sourceTrigger: function() {
        return 'sss'
    },
    sourceTriggerFactory: function() {
        return (
``)
    },
    sourceTR: function(nomeTrigger) {
        return (
`public with sharing class ${nomeTrigger}_tr { // implements T_SDK_ITrigger {

    private boolean m_isExecuting = false;
    private integer BatchSize     = 0;
    public static boolean FristRun = true;
    public static boolean afterFristRun = true;

    public ${nomeTrigger}_tr(boolean isExecuting, integer size) {
        m_isExecuting = isExecuting;
        BatchSize     = size;
    }

    public void bulkBefore() {
    }

    public void bulkAfter() {
    }

    public void beforeInsert(SObject so) {
    }

    public void beforeUpdate(SObject oldSo, SObject so) {
    }

    public void afterInsert(SObject so) {
    }

    public void afterUpdate(SObject oldSo, SObject so) {
    }

    public void beforeDelete(SObject so) { } public boolean IsExecuteAnonymousContext { get { return !IsTriggerContext; } } public boolean IsWebServiceContext { get { return !IsTriggerContext; } } public boolean IsVisualforcePageContext { get { return !IsTriggerContext; } } public void afterDelete(SObject so) {} public void OnUndelete(SObject restoredSObject) {} public boolean IsTriggerContext { get { return m_isExecuting; } }
    public void andFinally(){}
}`)
    },
    sourceTriggerSDK: function() {
        return (
``)
    },
    sourceTriggerMetaData: function(apiVersion = '49.0', status = 'Active', xmlns = 'http://soap.sforce.com/2006/04/metadata') {
        return (
`<?xml version="1.0" encoding="UTF-8"?>
    <ApexClass xmlns="${xmlns}">
        <apiVersion>${apiVersion}</apiVersion>
    <status>${status}</status>
</ApexClass>`)
    },
}

exports.default = Trigger