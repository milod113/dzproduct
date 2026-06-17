import ClientLayout from '@/Layouts/ClientLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdateTwoFactorForm from './Partials/UpdateTwoFactorForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

function Surface({ children, className = '' }) {
    return (
        <section className={`overflow-hidden rounded-[30px] border border-white/70 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.09)] backdrop-blur ${className}`}>
            {children}
        </section>
    )
}

export default function Edit({ mustVerifyEmail, status, twoFactor }) {
    return (
        <ClientLayout title="Profil">
            <div className="flex flex-col gap-6">
                <Surface>
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                </Surface>

                <Surface>
                    <UpdatePasswordForm />
                </Surface>

                {twoFactor?.eligible && (
                    <Surface>
                        <UpdateTwoFactorForm twoFactor={twoFactor} />
                    </Surface>
                )}

                <Surface className="border-rose-100/70">
                    <DeleteUserForm />
                </Surface>
            </div>
        </ClientLayout>
    );
}
