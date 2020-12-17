import React from 'react'
import '../../scss/main.scss'
import '../Footer/Footer.scss'
function Footer() {
    return (
        <footer className="footer flex justify-center align-center">
            <div className="footer__information flex column">
                <div className="developers__information flex column">
                    <div>
                        Maor Bason (links to git|linkin|whatever)
                    </div>
                    <div>
                        Adi Peled (links to git|linkin|whatever)
                    </div>
                </div>
                <h5 className="copyrights center">
                    @Coffe Rights Adi And Maor 2020
                    </h5>
            </div>
        </footer>
    )
}

export default Footer
