# kube-prometheus-watchdog-exporter

a simple webservice, that receives pings via webhooks and exports metrics for prometheus for watchdog monitoring

# /ping/:cluster

get this endpoint to set the last ping-timestamp

# /metrics

get this endpoint, to retrieve the list of pings for monitoring and alerting

    # HELP watchdog_lastping timestamp of last ping
    # TYPE watchdog_lastping gauge
    watchdog_lastping{cluster="swissmedia-gra7"} 1631530000000
    watchdog_lastping{cluster="swissmedia-sbg5"} 1631530000000
