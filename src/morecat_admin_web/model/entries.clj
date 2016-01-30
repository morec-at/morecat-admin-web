(ns morecat-admin-web.model.entries
  (:require  [clj-http.client :as client]
             [cheshire.core :refer :all]
             [clojure.string :as str]))

(defn find-entries
  []
  (let [entries (parse-string
                (:body (client/get "http://localhost:8080/admin/entries" {:accept :json})) true)]
    {:elements (map #(assoc % :tags (str/join "," (:tags %))) (:elements entries))
     :page (:page entries)
     :totalNumberOfElements (:totalNumberOfElements entries)
     :totalNumberOfPages (:totalNumberOfPages entries)
     :size (:size entries)
     :currentPageSize (:currentPageSize entries)
     :firstPage (:firstPage entries)
     :lastPage (:lastPage entries)}))

(defn find-entry-by-id
  [id]
  (let [entry (parse-string
                (:body (client/get (str "http://localhost:8080/admin/entries/" id) {:accept :json})) true)]
    (assoc entry :tags (str/join "," (:tags entry)))))

(defn find-available-formats
  []
  (parse-string
    (:body (client/get (str "http://localhost:8080/admin/entries/available-formats") {:accept :json})) true))

(defn find-available-states
  []
  (parse-string
    (:body (client/get (str "http://localhost:8080/admin/entries/available-states") {:accept :json})) true))

(declare -convert-tags)
(defn create-a-new-entry
  [entry]
  (client/post "http://localhost:8080/admin/entries/"
              {:body (-> (dissoc entry :__anti-forgery-token) -convert-tags generate-string)
               :content-type :json}))

(defn update-entry
  [entry]
  (client/put (str "http://localhost:8080/admin/entries/" (:id entry))
              {:body (-> (dissoc entry :__anti-forgery-token) -convert-tags generate-string)
               :content-type :json}))

(defn delete-entry-by-id
  [id]
  (client/delete (str "http://localhost:8080/admin/entries/" id)))

(defn -convert-tags
  [entry]
  (if
    (empty? (:tags entry))
    (assoc entry :tags [])
    (assoc entry :tags (-> (str/replace (:tags entry) #"\s+" "") (str/split #",")))))