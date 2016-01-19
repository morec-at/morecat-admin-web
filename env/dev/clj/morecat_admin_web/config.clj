(ns morecat-admin-web.config
  (:require [selmer.parser :as parser]
            [clojure.tools.logging :as log]
            [morecat-admin-web.dev-middleware :refer [wrap-dev]]))

(def defaults
  {:init
   (fn []
     (parser/cache-off!)
     (log/info "\n-=[morecat-admin-web started successfully using the development profile]=-"))
   :middleware wrap-dev})
