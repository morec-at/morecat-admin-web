(ns morecat-admin-web.config
  (:require [clojure.tools.logging :as log]))

(def defaults
  {:init
   (fn []
     (log/info "\n-=[morecat-admin-web started successfully]=-"))
   :middleware identity})
