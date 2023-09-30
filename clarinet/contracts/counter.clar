;; counter
(define-data-var counter uint u1) ;; counter initialized to 1

(define-public (increment (step uint)) ;; increment counter, print new-val
    (let ((new-val (+ step (var-get counter)))) 
        (var-set counter new-val)
        (print { object: "counter", action: "incremented", value: new-val })
        (ok new-val)))

(define-public (decrement (step uint)) ;; decrement counter, print new-val
    (let ((new-val (- step (var-get counter)))) 
        (var-set counter new-val)
        (print { object: "counter", action: "decremented", value: new-val })
        (ok new-val)))

(define-read-only (read-counter) ;; read value of counter
    (ok (var-get counter)))