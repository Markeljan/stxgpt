export const SYSTEM_PROMPT = {
  role: "system",
  content: `You are an AI assistant tasked to help the user write Clarity NFT smart contracts.  Users can either provide existing code in other programming lanuages or prompt you to generate code from scratch.  Simplify things unless the user asks for advanced details.  Use the example contracts that will be provided in the following system messages.  Make sure to get all necessary variables from the user depending on the contract.  Do not deploy contracts without confirmation form the user. Contract deployments have to be the first and only text in a message.  Do not try to deploy a contract in the middle of a response or add a response after a contract deployment funciton call.`
}

export const EXAMPLE_SIP10_FUNGIBLE_TOKEN = {
  role: "system",
  content: `
  FT contract
  Required variables from the user:
    - contract-name: string-ascii 256 (kebab-case) can be derived from the token name

;; ---------------------------------------------------------
;; SIP-10 Fungible Token Contract
;; ---------------------------------------------------------
(impl-trait 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.sip-010-trait-ft-standard.sip-010-trait)

(define-fungible-token leo)
(define-constant contract-owner tx-sender)

;; ---------------------------------------------------------
;; Constants/Variables
;; ---------------------------------------------------------
(define-data-var token-uri (optional (string-utf8 256)) none)

;; ---------------------------------------------------------
;; Errors
;; ---------------------------------------------------------
(define-constant ERR_UNAUTHORIZED (err u100))

;; ---------------------------------------------------------
;; SIP-10 Functions
;; ---------------------------------------------------------
(define-public (transfer
  (amount uint)
  (sender principal)
  (recipient principal)
  (memo (optional (buff 34)))
)
  (begin
    ;; #[filter(amount, recipient)]
    (asserts! (is-eq tx-sender sender) ERR_UNAUTHORIZED)
    (try! (ft-transfer? leo amount sender recipient))
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)

(define-read-only (get-balance (owner principal))
  (ok (ft-get-balance leo owner))
)

(define-read-only (get-name)
  (ok "Leo")
)

(define-read-only (get-symbol)
  (ok "LEO")
)

(define-read-only (get-decimals)
  (ok u6)
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply leo))
)

(define-read-only (get-token-uri)
    (ok (var-get token-uri)
    )
)

(define-public (set-token-uri (value (string-utf8 256)))
  ;; #[filter(value)]
  (if (is-eq tx-sender contract-owner)
    (ok (var-set token-uri (some value)))
    (err ERR_UNAUTHORIZED)
  )
)

;; ---------------------------------------------------------
;; Utility Functions
;; ---------------------------------------------------------
(define-public (send-many (recipients (list 200 { to: principal, amount: uint, memo: (optional (buff 34)) })))
  (fold check-err (map send-token recipients) (ok true))
)

(define-private (check-err (result (response bool uint)) (prior (response bool uint)))
  (match prior ok-value result err-value (err err-value))
)

(define-private (send-token (recipient { to: principal, amount: uint, memo: (optional (buff 34)) }))
  (send-token-with-memo (get amount recipient) (get to recipient) (get memo recipient))
)

(define-private (send-token-with-memo (amount uint) (to principal) (memo (optional (buff 34))))
  (let ((transferOk (try! (transfer amount tx-sender to memo))))
    (ok transferOk)
  )
)

;; ---------------------------------------------------------
;; Mint
;; ---------------------------------------------------------
(begin
  (try! (ft-mint? leo u10000000000000000 contract-owner)) 
)
  `
}

export const EXAMPLE_POAP_NON_FUNGIBLE_TOKEN = {
  role: "system",
  content: `
  POAP NFT contract with one uri for all tokens
  Required variables from the user:
    - contract-name: string-ascii 256 (kebab-case)
    - base-uri: string-ascii 256

;; sip-009: nft standard
(define-trait nft-trait
  ((get-last-token-id () (response uint uint))
    (get-token-uri (uint) (response (optional (string-ascii 256)) uint))
    (get-owner (uint) (response (optional principal) uint))
    (transfer (uint principal principal) (response bool uint))))

;; poap nft contract
(define-non-fungible-token poap-example uint)

;; define constants 
(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-NOT-AUTHORIZED u104)
(define-constant ERR-ONE-PER-WALLET u1)

(define-map token-count principal uint)
(define-map prompt-data principal { token-id: uint, url: (string-ascii 456) })

;; define variables
(define-data-var base-uri (string-ascii 256) "ipfs://QmRhkJToXrJYhAGBNP6NLNUTTrXSmuNAF2fH2JKphaJPLx")
(define-data-var last-cards-id uint u0)

;; define functions
(define-read-only (get-balance (account principal))
  (default-to u0
    (map-get? token-count account)))

(define-public (transfer (id uint) (sender principasl) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err ERR-NOT-AUTHORIZED))
    (trnsfr id sender recipient)))

(define-read-only (get-owner (id uint))
  (ok (nft-get-owner? poap-nft id)))

(define-read-only (get-last-token-id)
  (ok (var-get last-cards-id)))
  
(define-read-only (get-token-uri (id uint))
  (ok (some (var-get base-uri))))

(define-public (mint (recipient principal) (image-url (string-ascii 456)))
    (let ((token-id (+ (var-get last-cards-id) u1))
          (current-balance (get-balance tx-sender)))
        (asserts! (is-none (map-get? prompt-data recipient)) (err ERR-ONE-PER-WALLET))
        (try! (nft-mint? poap-nft token-id recipient))
        (var-set last-cards-id token-id)
        (map-insert prompt-data recipient {token-id: token-id, url: image-url})
        (map-set token-count recipient (+ current-balance u1))
        (ok token-id)))

(define-private (trnsfr (id uint) (sender principal) (recipient principal))
  (match (nft-transfer? poap-nft id sender recipient)
    success
      (let((sender-balance (get-balance sender))
        (recipient-balance (get-balance recipient)))
          (map-set token-count
            sender
            (- sender-balance u1))
          (map-set token-count
            recipient
            (+ recipient-balance u1))
          (ok success))
    error (err error)))

(define-read-only (check-map (token-holder principal)) 
(ok (map-get? prompt-data token-holder)))

(define-public (change-uri (set-image-uri (string-ascii 200))) 
(begin 
  (asserts! (is-eq tx-sender CONTRACT-OWNER) (err ERR-NOT-AUTHORIZED))
  (var-set base-uri set-image-uri)
  (ok true)))
  `
}


/*
Example SIP-10 Fungible Token Contract

;; ---------------------------------------------------------
;; SIP-10 Fungible Token Contract
;; ---------------------------------------------------------
(impl-trait 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.sip-010-trait-ft-standard.sip-010-trait)

(define-fungible-token leo)
(define-constant contract-owner tx-sender)

;; ---------------------------------------------------------
;; Constants/Variables
;; ---------------------------------------------------------
(define-data-var token-uri (optional (string-utf8 256)) none)

;; ---------------------------------------------------------
;; Errors
;; ---------------------------------------------------------
(define-constant ERR_UNAUTHORIZED (err u100))

;; ---------------------------------------------------------
;; SIP-10 Functions
;; ---------------------------------------------------------
(define-public (transfer
  (amount uint)
  (sender principal)
  (recipient principal)
  (memo (optional (buff 34)))
)
  (begin
    ;; #[filter(amount, recipient)]
    (asserts! (is-eq tx-sender sender) ERR_UNAUTHORIZED)
    (try! (ft-transfer? leo amount sender recipient))
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)

(define-read-only (get-balance (owner principal))
  (ok (ft-get-balance leo owner))
)

(define-read-only (get-name)
  (ok "Leo")
)

(define-read-only (get-symbol)
  (ok "LEO")
)

(define-read-only (get-decimals)
  (ok u6)
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply leo))
)

(define-read-only (get-token-uri)
    (ok (var-get token-uri)
    )
)

(define-public (set-token-uri (value (string-utf8 256)))
  ;; #[filter(value)]
  (if (is-eq tx-sender contract-owner)
    (ok (var-set token-uri (some value)))
    (err ERR_UNAUTHORIZED)
  )
)

;; ---------------------------------------------------------
;; Utility Functions
;; ---------------------------------------------------------
(define-public (send-many (recipients (list 200 { to: principal, amount: uint, memo: (optional (buff 34)) })))
  (fold check-err (map send-token recipients) (ok true))
)

(define-private (check-err (result (response bool uint)) (prior (response bool uint)))
  (match prior ok-value result err-value (err err-value))
)

(define-private (send-token (recipient { to: principal, amount: uint, memo: (optional (buff 34)) }))
  (send-token-with-memo (get amount recipient) (get to recipient) (get memo recipient))
)

(define-private (send-token-with-memo (amount uint) (to principal) (memo (optional (buff 34))))
  (let ((transferOk (try! (transfer amount tx-sender to memo))))
    (ok transferOk)
  )
)

;; ---------------------------------------------------------
;; Mint
;; ---------------------------------------------------------
(begin
  (try! (ft-mint? leo u10000000000000000 contract-owner)) 
)

*/