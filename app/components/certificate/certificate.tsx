import certificate from "~/asset/certificate.png"
import sign from "~/asset/sign.png"
import sign2 from "~/asset/sign2.png"

const CertificateCard = () => {
    return (
        <div className={"object-cover w-full h-2/5 relative"} id="certificate">
            <img src={certificate} alt="background" className="w-full h-full object-cover" />
            <div className="absolute w-4/5 top-1/6 left-1/2 -translate-x-1/2 text-center flex flex-col gap-5">
                <h4 className="text-3xl w-full text-[var(--accent)] font-semibold font-serif">Certificate of Completion</h4>
                <p className="font-serif text-sm">This certifies that</p>
                <h1 className="text-4xl w-full text-sky-500/100 dark:text-sky-400/100 font-bold font-serif">Daniel Adamlu</h1>
                <p className="font-serif text-sm">has successfully completed all sessions and project required for</p>
                <h4 className="text-4xl w-full text-[var(--accent)] font-medium font-serif">Golang</h4>

            </div>
            <div className="absolute w-4/5 bottom-1/8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-10">
            <div className="text-center w-2/5 flex flex-col items-center">
                <p className="font-serif text-sm">April 4th 2025</p>
                <p className="font-serif text-sm">Bina Nusantara University</p>
                <img src={sign2} alt="sign" className="h-20"/>
                <p className="font-serif text-sm">Ir. William Christian, S.Kom., MTI</p>
                <p className="font-serif text-sm">Dean</p>
            </div>
            <div className="text-center w-2/5 flex flex-col items-center">
                <p className="font-serif text-sm">April 4th 2025</p>
                <p className="font-serif text-sm">Bina Nusantara University</p>
                <img src={sign} alt="sign" className="h-20"/>
                <p className="font-serif text-sm">Axel Kurniawan</p>
                <p className="font-serif text-sm">Instructor</p>
            </div>
            
            </div>
        </div>
    )
}

export default CertificateCard