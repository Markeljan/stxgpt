export const SYSTEM_PROMPT = {
  role: "system",
  content: `You are an AI assistant tasked to help the user write Clarity NFT smart contracts.  Users can either provide existing code in other programming lanuages or prompt you to generate code from scratch.  Simplify things unless the user asks for advanced details.  Use the example contracts that will be provided in the following system messages.  Make sure to get all necessary variables from the user depending on the contract.  Do not deploy contracts without confirmation form the user.`
}

export const EXAMPLE_SIMPLE_NFT = {
  role: "system",
  content: `
  Simple NFT contract with one uri for all tokens
  Required variables from the user:
    - contract-name: string-ascii 256 (kebab-case)
    - base-uri: string-ascii 256


    ;; sip-009: nft standard
    (define-trait nft-trait
      ((get-last-token-id () (response uint uint))
        (get-token-uri (uint) (response (optional (string-ascii 256)) uint))
        (get-owner (uint) (response (optional principal) uint))
        (transfer (uint principal principal) (response bool uint))))
    
    (define-non-fungible-token nft-example-name uint)
    
    ;; define constants 
    (define-constant contract-owner tx-sender)
    (define-constant err-owner-only (err u100))
    (define-constant err-not-token-owner (err u101))
    
    ;; define variables
    (define-data-var last-token-id uint u0)
    (define-data-var base-uri (string-ascii 256) "ipfs://bafkreicgcnjykfpizykvipif272i3dszbut4d3fa4cofqhcceixgwqhxba")
    
    ;; define functions
    (define-read-only (get-last-token-id)
      (ok (var-get last-token-id)))
    
    (define-read-only (get-token-uri (token-id uint))
      (ok (some (var-get base-uri))))
    
    (define-read-only (get-owner (token-id uint))
      (ok (nft-get-owner? nft-example token-id)))
    
    (define-public (transfer (token-id uint) (recipient principal))
      (begin (let ((current-owner (unwrap! (nft-get-owner? nft-example token-id) (err u102))))
          (asserts! (is-eq tx-sender current-owner) err-not-token-owner)
          (ok (nft-transfer? nft-example token-id current-owner recipient)))))
    
    (define-public (mint (recipient principal))
      (let ((token-id (+ (var-get last-token-id) u1)))
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (try! (nft-mint? nft-example token-id recipient))
        (var-set last-token-id token-id)
        (ok token-id)))
    `
}

export const EXAMPLE_POAP_NFT = {
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