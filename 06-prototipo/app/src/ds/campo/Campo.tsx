// Os campos (F06): texto de 48 com o rótulo em cima e o erro embaixo, no lugar; o código de 6 dígitos; a área de texto.
// No computador, o campo ativo sobe o teclado desenhado; no celular de verdade, sobe o teclado do celular, no tipo certo.
import { useEffect, useId, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { usarTeclado, type TipoDeTeclado } from '@/sistema/Teclado';
import { GlassInput } from '@/components/glassyui/glass-input';
import { GlassTextarea } from '@/components/glassyui/glass-textarea';
import { usarVidro } from '@/ds/vidro/usarVidro';
import './campo.css';

interface Comum {
  rotulo: string;
  valor: string;
  aoMudar?: (valor: string) => void;
  /** o que a tecla de retorno faz: o mesmo que o botão da tela */
  aoEnviar?: () => void;
  dica?: string;
  erro?: boolean;
  /** o erro, no lugar, embaixo do campo */
  children?: ReactNode;
  /** a foto do campo com foco, parada: o texto e o cursor desenhados (os estados parados) */
  fotoComFoco?: boolean;
  /** começa com o foco no campo */
  comFoco?: boolean;
  desligado?: boolean;
}

function usarCampo(tipo: TipoDeTeclado, valor: string, aoMudar: Comum['aoMudar'], aoEnviar: Comum['aoEnviar'], rotuloDoIr: string | undefined, limite?: number, soNumeros?: boolean) {
  const teclado = usarTeclado();
  const agora = useRef({ valor, aoMudar, aoEnviar });
  agora.current = { valor, aoMudar, aoEnviar };
  const aceita = (v: string) => {
    let n = soNumeros ? v.replace(/\D/g, '') : v;
    if (limite) n = n.slice(0, limite);
    return n;
  };
  return {
    aceita,
    onFocus: () =>
      teclado.abrir(
        tipo,
        {
          inserir: (t) => agora.current.aoMudar?.(aceita(agora.current.valor + t)),
          apagar: () => agora.current.aoMudar?.(agora.current.valor.slice(0, -1)),
          enviar: () => agora.current.aoEnviar?.(),
        },
        rotuloDoIr,
      ),
    onBlur: () => teclado.fechar(),
  };
}

export interface CampoProps extends Comum {
  tipo: 'email' | 'celular';
}

/** O campo de texto: 48, fundo-elevado com borda, rótulo de apoio em cima. */
export function Campo({ rotulo, valor, aoMudar, aoEnviar, dica, erro, children, tipo, fotoComFoco, comFoco, desligado }: CampoProps) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  // o celular só tem números: sobe o teclado numérico, como o do código
  const c = usarCampo(tipo === 'celular' ? 'numeros' : 'letras', valor, aoMudar, aoEnviar, 'ir');
  const deVidro = usarVidro('campos');
  useEffect(() => {
    if (comFoco) ref.current?.focus({ preventScroll: true });
  }, [comFoco]);
  return (
    <div className={clsx('field', deVidro && 'de-vidro')}>
      {!(deVidro && !fotoComFoco) && <label htmlFor={id}>{rotulo}</label>}
      {fotoComFoco ? (
        <div id={id} className={clsx('inp focus foto', deVidro && 'lg-input campo-de-vidro')} role="textbox" aria-label={rotulo}>
          <span>{valor}</span>
          <i className="caret" />
        </div>
      ) : deVidro ? (
        <GlassInput
          ref={ref}
          id={id}
          label={rotulo}
          className="campo-de-vidro"
          type={tipo === 'email' ? 'email' : 'tel'}
          inputMode={tipo === 'email' ? 'email' : 'tel'}
          autoComplete={tipo === 'email' ? 'email' : 'tel'}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={dica}
          value={valor}
          disabled={desligado}
          onChange={(ev) => aoMudar?.(ev.target.value)}
          onKeyDown={(ev) => ev.key === 'Enter' && aoEnviar?.()}
          onFocus={c.onFocus}
          onBlur={c.onBlur}
          aria-invalid={erro || undefined}
          data-peca-de-vidro="campos"
          data-material="vidro"
        />
      ) : (
        <input
          ref={ref}
          id={id}
          className={clsx('inp', erro && 'err')}
          data-peca-de-vidro="campos"
          data-material="solido"
          type={tipo === 'email' ? 'email' : 'tel'}
          inputMode={tipo === 'email' ? 'email' : 'tel'}
          autoComplete={tipo === 'email' ? 'email' : 'tel'}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={dica}
          value={valor}
          disabled={desligado}
          onChange={(ev) => aoMudar?.(ev.target.value)}
          onKeyDown={(ev) => ev.key === 'Enter' && aoEnviar?.()}
          onFocus={c.onFocus}
          onBlur={c.onBlur}
          aria-invalid={erro || undefined}
        />
      )}
      {children}
    </div>
  );
}

/** O campo do código: 6 dígitos, 24/700 tabular com tracking de 0,5em. É marcado como código de uso único. */
export function CampoDeCodigo({ rotulo, valor, aoMudar, aoEnviar, erro, children, fotoComFoco, comFoco, desligado }: Comum) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  const c = usarCampo('numeros', valor, aoMudar, aoEnviar, undefined, 6, true);
  const deVidro = usarVidro('campos');
  useEffect(() => {
    if (comFoco) ref.current?.focus({ preventScroll: true });
  }, [comFoco]);
  return (
    <div className={clsx('field', deVidro && 'de-vidro')}>
      {!(deVidro && !fotoComFoco) && <label htmlFor={id}>{rotulo}</label>}
      {fotoComFoco ? (
        <div id={id} className={clsx('otp focus foto', deVidro && 'lg-input campo-de-vidro do-codigo')} role="textbox" aria-label={rotulo}>
          <span>{valor}</span>
          <i className="caret" />
        </div>
      ) : (
        (() => {
          const comuns = {
            ref,
            id,
            type: 'text',
            inputMode: 'numeric' as const,
            autoComplete: 'one-time-code',
            maxLength: 6,
            placeholder: '······',
            value: valor,
            disabled: desligado,
            onChange: (ev: React.ChangeEvent<HTMLInputElement>) => aoMudar?.(c.aceita(ev.target.value)),
            onKeyDown: (ev: React.KeyboardEvent) => ev.key === 'Enter' && aoEnviar?.(),
            onFocus: c.onFocus,
            onBlur: c.onBlur,
            'aria-invalid': erro || undefined,
          };
          return deVidro ? <GlassInput {...comuns} label={rotulo} className="campo-de-vidro do-codigo" data-peca-de-vidro="campos" data-material="vidro" /> : <input {...comuns} className={clsx('otp', erro && 'err', desligado && 'dis')} data-peca-de-vidro="campos" data-material="solido" />;
        })()
      )}
      {children}
    </div>
  );
}

/** A área de texto do pedido. Parada, é a foto (o texto ou a dica); no fluxo, é um campo de verdade. */
export function AreaDeTexto({ rotulo, valor, aoMudar, aoEnviar, dica, erro, children, fotoComFoco, foto }: Comum & { foto?: boolean }) {
  const id = useId();
  const ref = useRef<HTMLTextAreaElement>(null);
  // a tecla OK guarda o teclado: o campo perde o foco, e o texto fica como está. Quem envia é o botão da tela
  const c = usarCampo('letras', valor, aoMudar, aoEnviar ?? (() => ref.current?.blur()), 'OK');
  const deVidro = usarVidro('campos');
  const aoVivo = deVidro && !foto && !fotoComFoco;
  return (
    <div className={clsx('field', deVidro && 'de-vidro')}>
      {!aoVivo && <label htmlFor={foto || fotoComFoco ? undefined : id}>{rotulo}</label>}
      {fotoComFoco ? (
        <div className={clsx('ta focus', deVidro && 'lg-input campo-de-vidro da-area')} role="textbox" aria-label={rotulo}>
          <span>{valor}</span>
          <i className="caret" />
        </div>
      ) : foto ? (
        <div className={clsx('ta', !valor && 'plc', deVidro && 'lg-input campo-de-vidro da-area')} role="textbox" aria-label={rotulo} aria-readonly="true">
          {valor || dica}
        </div>
      ) : (
        deVidro ? (
          <GlassTextarea ref={ref} id={id} label={rotulo} className="campo-de-vidro da-area" rows={4} placeholder={dica} value={valor} onChange={(ev) => aoMudar?.(ev.target.value)} onFocus={c.onFocus} onBlur={c.onBlur} aria-invalid={erro || undefined} data-peca-de-vidro="campos" data-material="vidro" />
        ) : (
          <textarea ref={ref} id={id} className={clsx('ta', erro && 'err')} placeholder={dica} value={valor} onChange={(ev) => aoMudar?.(ev.target.value)} onFocus={c.onFocus} onBlur={c.onBlur} aria-invalid={erro || undefined} />
        )
      )}
      {children}
    </div>
  );
}
